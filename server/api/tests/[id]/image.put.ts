import {
  COMMON_TOP_IMAGE_HEIGHT,
  COMMON_TOP_IMAGE_WIDTH,
  COMMON_IMAGE_SIZE_MAX_MB,
  COMMON_IMAGE_SIZE_MAX
} from '#shared/constants/common.constant';

export default defineEventHandler(async (event) => {
  const authSession = await repository.auth.getSession(event.headers);

  if (!authSession)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );

  const { id } = getRouterParams(event);

  const prevTest: UserTest | null = await repository.test.findById(
    authSession?.user.id,
    id
  );

  if (!prevTest)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Test not found'
      })
    );

  if (authSession.user.id !== prevTest.author.id)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );

  const multipartData = await readMultipartFormData(event);

  if (!multipartData) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    );
  }

  const imageMultipartData = multipartData.find(
    (item) => item.name === 'image'
  );

  if (!imageMultipartData || !imageMultipartData.data) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid file'
      })
    );
  }

  if (imageMultipartData.data.byteLength > COMMON_IMAGE_SIZE_MAX) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: `Image file size exceeds the maximum size of ${COMMON_IMAGE_SIZE_MAX_MB} MB`
      })
    );
  }

  try {
    const uploadedImage = await image.upload(
      imageMultipartData.data,
      COMMON_TOP_IMAGE_HEIGHT,
      COMMON_TOP_IMAGE_WIDTH,
      prevTest.id,
      'tests'
    );

    const testImage: string | null = await repository.test.updateImage(
      id,
      uploadedImage.secure_url
    );

    return {
      statusCode: 200,
      statusMessage: 'Test image edited successfully',
      body: {
        image: testImage
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Test image edit failed'
      })
    );
  }
});
