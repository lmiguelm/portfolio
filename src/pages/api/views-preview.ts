import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/database';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query(`
      SELECT 
        views
      FROM
        TABLE_VIEWS
    `);

    const views = result[0].views + 1;

    query(
      `
      UPDATE
        TABLE_VIEWS
      SET
        views = ?
    `,
      [views]
    );

    return res.json({ views });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
