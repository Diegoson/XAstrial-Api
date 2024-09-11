const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');

async function fb_dl(url) {
    const data = qs.stringify({
        id: url,
        locale: 'en'
    });

    try {
        const response = await axios.post('https://getmyfb.com/process', data, {
            headers: {
                'cookie': 'PHPSESSID=hevqvlmmcejajq12c8ur64nvh3; __cflb=0H28vwyfhACcZteBqmh4duvZ364xFvNq19VDToCag7m; _token=PwgFqlfDcTJDVKljgIG5'
            }
        });
        const $ = cheerio.load(response.data);
        const results = [];
        $('.results-item').each((index, element) => {
            const thumbnail = $(element).find('.results-item-image').attr('src');
            const text = $(element).find('.results-item-text').text().trim();

            const downloads = [];
            $(element).next('.results-download').find('.results-list-item').each((i, el) => {
                const quality = $(el).text().replace(/Download\s*/g, '').trim();
                const dl_url = $(el).find('a').attr('href');
                const dl_name = $(el).find('a').attr('download');
                downloads.push({ quality, dl_url, dl_name });
            });
            results.push({ thumbnail, text, downloads });
        });

        return results;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { fb_dl };
              
