interface SeoMeta {
  title?: string;
  description?: string;
  image?: string;
}

const seoMeta = ({
  title = 'skuzow/quiz',
  description = 'Make, create, and share tests in a simple and easy way. Best method to prepare your exams.',
  image = '/images/website.png'
}: SeoMeta = {}) => {
  const originURL: string = useRequestURL().origin;
  const routePath: string = useRoute().path;

  const websiteURL: string = originURL + routePath;
  const imageURL: string = originURL + image;

  useHead({
    htmlAttrs: {
      lang: 'en' // TODO: make this language dynamic
    },
    link: [
      {
        rel: 'canonical',
        href: websiteURL
      }
    ]
  });

  useSeoMeta({
    title: title,
    themeColor: '#0B0A0B', // TODO: make this color dynamic
    description: description,

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageURL,
    twitterImageAlt: title,

    ogLocale: 'en_EN', // TODO: make this language dynamic
    ogUrl: websiteURL,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageURL,
    ogImageAlt: title,
    ogSiteName: title
  });
};

export default seoMeta;
