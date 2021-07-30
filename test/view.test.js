const nock = require('nock');
const chai = require('chai');  
const sinon = require('sinon');

const View = require('../src/view');

const assert = chai.assert; 
const expect = chai.expect;  



describe('view',  () => {

    it('renders on message', async () => {
        const view = new View();
        const formatSpy = sinon.spy(view, "formatMessage");
        const fakeTwitterMessage = {
            service: 'twitter',
            content: 'you have a new follower Aimtech9'
        }
        view.onMessage(fakeTwitterMessage);
        expect(formatSpy.called).to.equal(true);
    });

    it('formats message correctly', async () => {
        const view = new View();
        const fakeTwitterMessage = {
            service: 'twitter',
            content: 'you have a new follower Aimtech9'
        }
        const formattedMessage = view.formatMessage(fakeTwitterMessage);
        expect(formattedMessage).to.equal(\u001b[38;2;29;160;242m\u001b[1mTwitter\u001b[22m\u001b[39m - you have a new follower Aimtech9 - 12:00 AM GMT+0000');
    });
    
});

