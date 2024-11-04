interface SeoMeta {
  title?: string;
  description?: string;
  image?: string;
}

const seoMeta = ({
  title,
  description,
  image = '/images/website.png'
}: SeoMeta = {}) => {
  const { t: $t } = useI18n();

  const originURL: string = useRequestURL().origin;
  const routePath: string = useRoute().path;

  const websiteURL: string = originURL + routePath;
  const imageURL: string = originURL + image;

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

  if (!description) description = $t('description');

  useSeoMeta({
    title: title,
    description: description,

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageURL,
    twitterImageAlt: title,

    ogUrl: websiteURL,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageURL,
    ogImageAlt: title,
    ogSiteName: title
  });
};

export default seoMeta;
