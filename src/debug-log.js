export const debug = typeof process.env.JYT_DEBUG !== 'undefined' ?
    console.log.bind(null, '[DEBUG][jyt]:') :
    (() => null);
export const error = typeof process.env.JYT_ERROR !== 'undefined' ?
    console.error.bind(null, '[ERROR][jyt]:') :
    (() => null);
