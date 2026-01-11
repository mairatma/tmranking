import { parse } from 'node-html-parser';
import { extractGridCallbackState, extractInputValue } from '../helpers';

/**
 * Parse ranking table from HTML
 * The table structure uses Bootstrap grid layout within table cells
 */
export const parseRankingTable = (html: string) => {
  const root = parse(html);

  // Find the main table by ID
  const table = root.querySelector('table#mainContent_grid_DXMainTable')!;

  const rankings = [];

  // Find all data rows (they have IDs like mainContent_grid_DXDataRow0, DXDataRow1, etc.)
  const rows = table.querySelectorAll('tr[id*="DXDataRow"]');

  for (const row of rows) {
    try {
      // Each row contains a complex Bootstrap grid structure
      // Structure: <tr><td><div><div class="row"><div class="col-md-*">...</div></div></div></td></tr>

      const columns = row.querySelectorAll('.col-md-1, .col-md-8, .col-md-2');

      if (columns.length < 3) {
        console.warn('Row has insufficient columns, skipping');
        continue;
      }

      // Column 0 (col-md-1): Rank - e.g., "Rk 1"
      const rankSpan = columns[0].querySelector('span');
      const rank = rankSpan ? rankSpan.text.trim().replace('Rk ', '') : '';

      // Column 1 (col-md-1): Points link - e.g., "2685 Pts"
      const pointsLink = columns[1].querySelector('a');
      const points = pointsLink
        ? pointsLink.text.trim().replace(' Pts', '')
        : '';

      // Column 2 (col-md-8): Name and Club
      const nameSpan = columns[2].querySelector('span.FonteTexto');
      const clubAndStateSpan = columns[2].querySelector('span.FonteTextoClaro');

      const name = nameSpan ? nameSpan.text.trim() : '';
      const clubAndState = clubAndStateSpan ? clubAndStateSpan.text.trim() : '';
      const [club, state] = clubAndState.split('-');

      const link = row.querySelector('a');
      const href = link!.getAttribute('href')!;
      const id = /Associado=(\d+)/.exec(href)![1];

      // Only add if we have meaningful data
      if (name && rank) {
        rankings.push({
          id,
          rank: parseInt(rank, 10),
          name: name,
          club: club?.trim(),
          state: state?.trim(),
          points: parseInt(points, 10),
        });
      }
    } catch (error) {
      console.error('Error parsing row:', error);
      continue;
    }
  }

  const totalItems = /(?:'|\\')itemCount(?:'|\\'):\s*(\d+)/.exec(html)![1];

  return { rankings, totalItems };
};

export const extractSessionData = (html: string) => {
  const root = parse(html);

  const viewState = extractInputValue(root, '__VIEWSTATE');
  const eventValidation = extractInputValue(root, '__EVENTVALIDATION');
  const gridCallbackState = extractGridCallbackState(root);
  if (!viewState || !eventValidation || !gridCallbackState) {
    throw new Error('Could not extract new session data from html');
  }

  return { viewState, eventValidation, gridCallbackState };
};
