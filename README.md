# FrameHarbor — Part 3

A calm image-discovery app built with plain HTML, CSS, and JavaScript. Extends the original cream-and-teal Part 1 design with real Wikimedia Commons image search; no API key or build tools needed.

## Run
Open index.html in a modern browser with an internet connection.

## Features
- Submit by clicking Search or pressing Enter, without a page reload.
- Trim and ignore blank queries; encode multi-word queries in the API URL.
- Fetch results, check response.ok, parse JSON, and render cards using createElement and appendChild.
- Replace previous results on each search.
- Enhancements: working Nature/Architecture/Ocean chips, result counts, image dimensions, and full-image links opening in a new tab.
- Basic failure feedback and protection against out-of-order search responses.

## Manual checks
1. Search cats with the Search button: image cards and a count should appear.
2. Search new york with Enter: results should replace cats without reloading.
3. Submit whitespace: no API request and no change to existing results.
4. Click Ocean: input and results should update.
5. Open a card: full image opens separately. Consult Wikimedia Commons for each image's reuse terms.

## Deployment
Live app: https://snehithgutla.github.io/HTML/
Repository: https://github.com/snehithgutla/HTML

GitHub Pages serves the root of the part-3-polish-deploy branch.

## Part 3 polish
The app shows a spinner and searching message during fetch, a friendly no-results message for empty responses, and connection advice on API/network failure. The search button is restored after requests, old responses cannot overwrite newer searches, cards fade in, the page title reflects the query, and reduced-motion preferences are respected.

## State checks
- Search cats, then new york: loading feedback becomes image results.
- Search zxqwlk: no-results feedback replaces the grid.
- Disconnect the network and search: a friendly error appears. Reconnect and search to recover.
- Submit whitespace: no request is sent.
