/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader');

  webFontLoader.load({
    google: {
      families: [
        'Poppins:100,300,400,500,600,700,900&display=swap',
        'Montserrat:100,300,400,500,600,700,900&display=swap',
      ],
    },
  });
}
