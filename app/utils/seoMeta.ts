interface SeoMeta {
  title?: string;
  description?: string;
  image?: string | null;
}

const seoMeta = ({ title, description, image }: SeoMeta = {}) => {
  const { origin } = useRequestURL();
  const { path } = useRoute();

  const websiteURL: string = origin + path;

  useHead({
    link: [
      {
        rel: 'canonical',
        href: websiteURL
      }
    ]
  });

  if (title) title = `${title} - skuzow/quiz`;
  else title = 'skuzow/quiz';

  if (!description) {
    const { t: $t } = useI18n();

    description = $t('description');
  }

  if (!image) image = origin + '/images/website.png';

  useSeoMeta({
    title: title,
    description: description,

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: title,

    ogUrl: websiteURL,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: title,
    ogSiteName: title
  });
};

export default seoMeta;
