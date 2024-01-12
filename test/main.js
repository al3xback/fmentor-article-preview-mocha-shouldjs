import should from 'should';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url =
	'https://al3xback.github.io/fmentor-article-preview-mocha-shouldjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have an empty alt attribute value of card drawer image element', () => {
		const cardDrawerImageEl = document.querySelector('.card__image img');
		const cardDrawerImageAlt = cardDrawerImageEl.getAttribute('alt');

		cardDrawerImageAlt.should.be.empty();
	});

	it("should have a post date element with a class of 'card__author-post-date'", () => {
		const cardPostDateEl = document.querySelector(
			'.card__author-post-date'
		);

		cardPostDateEl.should.be.ok();
	});

	it('should have a post date year ranging from 2018 to 2020', () => {
		const cardPostDate = document.querySelector(
			'.card__author-post-date'
		).textContent;
		const cardPostDateYear = cardPostDate
			.split(' ')[2]
			.replace(/\n|\t/g, '');

		cardPostDateYear.should.be.within(2018, 2020);
	});
});
