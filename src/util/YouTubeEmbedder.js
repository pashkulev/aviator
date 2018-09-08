import React from 'react';
import Parser from 'html-react-parser';

const YOUTUBE_VIDEO_URL_REGEX = /\bhttps:\/\/www\.youtube\.com\/watch\?v=([^\s&]+)/gm;

function YouTubeEmbedder(props) {
	return (
		<div>
			{Parser(processContent(props.content))}
		</div>
	);
}
function processContent(content) {
	let result;
	while ((result = YOUTUBE_VIDEO_URL_REGEX.exec(content)) != null) {
		content = content.replace(result[0], `${result[0]}<br/> ${makeEmbedHtml(result[1])}<br/>`);
	}

	return content;
}

function makeEmbedHtml(videoID) {
	return `<div class="text-center">
				<iframe width="420" height="315"
						src="https://www.youtube.com/embed/${videoID}"
						allowfullscreen="allowfullscreen">
				</iframe>
			</div>`;
}

export default YouTubeEmbedder;