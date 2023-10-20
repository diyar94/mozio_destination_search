import {readFileSync} from 'fs';
import {DataItem} from '@/types';


export default {
    'GET /api/places': (req, res) =>
    {

        const dataRaw = readFileSync('public/data.json', 'utf-8');

        const {query} = req;

        const {search} = query;

        try
        {
            let data = JSON.parse(dataRaw);

            if (search)
            {
                const rx = new RegExp(search, 'igu');
                data = data.filter((el: DataItem) => el.name.match(rx));
            }

            res.status(200).json(data);
        }
        catch (e)
        {
            res.status(400).json({
                error: {
                    message: e.message
                }
            });
        }

    }
};
