const knownSites = [
  'youtube.com',
  'youtu.be',
  'tape.xyz',
  'twitch.tv',
  'kick.com',
  'open.spotify.com',
  'soundcloud.com',
  'oohlala.xyz',
  'my.spline.design',
  'www.figma.com',
  'figma.com'
];

// URLs that are manually picked to be embedded that dont have embed metatags
const pickUrlSites = [
  'open.spotify.com',
  'kick.com',
  'my.spline.design',
  'www.figma.com',
  'figma.com'
];

const spotifyTrackUrlRegex =
  /^ht{2}ps?:\/{2}open\.spotify\.com\/track\/[\dA-Za-z]+(\?si=[\dA-Za-z]+)?$/;
const spotifyPlaylistUrlRegex =
  /^ht{2}ps?:\/{2}open\.spotify\.com\/playlist\/[\dA-Za-z]+(\?si=[\dA-Za-z]+)?$/;
const oohlalaUrlRegex =
  /^ht{2}ps?:\/{2}oohlala\.xyz\/playlist\/[\dA-Fa-f-]+(\?si=[\dA-Za-z]+)?$/;
const soundCloudRegex =
  /^ht{2}ps?:\/{2}soundcloud\.com(?:\/[\dA-Za-z-]+){2}(\?si=[\dA-Za-z]+)?$/;
const youtubeRegex =
  /^https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w-]+)(?:\?.*)?$/;
const tapeRegex =
  /^https?:\/\/tape\.xyz\/watch\/[\dA-Za-z-]+(\?si=[\dA-Za-z]+)?$/;
const twitchRegex = /^https?:\/\/www\.twitch\.tv\/videos\/[\dA-Za-z-]+$/;
const kickRegex = /^https?:\/\/kick\.com\/[\dA-Za-z-]+$/;
const splineRegex =
  /^https?:\/\/my\.spline\.design\/[\dA-Za-z-]+(\?si=[\dA-Za-z]+)?$/;
const figmaRegex = /^https:\/\/(www\.)?figma\.com\/file\/[^/]+\/[^/]+$/;
const generateIframe = (
  embedUrl: null | string,
  url: string
): null | string => {
  const universalSize = `width="100%" height="415"`;
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace('www.', '');
  const pickedUrl = pickUrlSites.includes(hostname) ? url : embedUrl;
  // Remove query params from url
  const cleanedUrl = pickedUrl?.split('?')[0] as string;

  if (!knownSites.includes(hostname) || !pickedUrl) {
    return null;
  }

  console.log('figmaRegex', figmaRegex.test(cleanedUrl));

  switch (hostname) {
    case 'youtube.com':
    case 'youtu.be': {
      if (youtubeRegex.test(cleanedUrl)) {
        return `<iframe src="${pickedUrl}" ${universalSize} allow="accelerometer; encrypted-media" allowfullscreen></iframe>`;
      }

      return null;
    }
    case 'tape.xyz': {
      if (tapeRegex.test(cleanedUrl)) {
        return `<iframe src="${pickedUrl}" ${universalSize} allow="accelerometer; encrypted-media" allowfullscreen></iframe>`;
      }

      return null;
    }
    case 'twitch.tv': {
      const twitchEmbedUrl = pickedUrl.replace(
        '&player=facebook&autoplay=true&parent=meta.tag',
        '&player=hey&autoplay=false&parent=hey.xyz'
      );
      if (twitchRegex.test(cleanedUrl)) {
        return `<iframe src="${twitchEmbedUrl}" ${universalSize} allowfullscreen></iframe>`;
      }

      return null;
    }
    case 'kick.com': {
      const kickEmbedUrl = pickedUrl.replace('kick.com', 'player.kick.com');
      if (kickRegex.test(cleanedUrl)) {
        return `<iframe src="${kickEmbedUrl}" ${universalSize} allowfullscreen></iframe>`;
      }

      return null;
    }
    case 'open.spotify.com': {
      const spotifySize = `style="max-width: 100%;" width="100%"`;
      if (spotifyTrackUrlRegex.test(cleanedUrl)) {
        const spotifyUrl = pickedUrl.replace('/track', '/embed/track');
        return `<iframe src="${spotifyUrl}" ${spotifySize} height="155" allow="encrypted-media"></iframe>`;
      }

      if (spotifyPlaylistUrlRegex.test(cleanedUrl)) {
        const spotifyUrl = pickedUrl.replace('/playlist', '/embed/playlist');
        return `<iframe src="${spotifyUrl}" ${spotifySize} height="380" allow="encrypted-media"></iframe>`;
      }

      return null;
    }
    case 'soundcloud.com': {
      if (soundCloudRegex.test(cleanedUrl)) {
        return `<iframe src="${pickedUrl}" ${universalSize}></iframe>`;
      }

      return null;
    }
    case 'oohlala.xyz': {
      if (oohlalaUrlRegex.test(cleanedUrl)) {
        return `<iframe src="${pickedUrl}" ${universalSize}></iframe>`;
      }

      return null;
    }
    case 'my.spline.design': {
      if (splineRegex.test(cleanedUrl)) {
        return `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" src="${pickedUrl}" ${universalSize}></iframe>`;
      }

      return null;
    }
    case 'figma.com':
    case 'www.figma.com': {
      if (figmaRegex.test(cleanedUrl)) {
        const figmaUrl = `https://www.figma.com/embed?embed_host=share&url=${cleanedUrl}`;
        return `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" src="${figmaUrl}" ${universalSize} allowfullscreen></iframe>`;
      }

      return null;
    }
    default:
      return `<iframe src="${pickedUrl}" width="560"></iframe>`;
  }
};

export default generateIframe;