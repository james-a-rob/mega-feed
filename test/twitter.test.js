const nock = require('nock');
const chai = require('chai');  
const sinon = require('sinon');

const Twitter = require('../src/services/twitter');
const twitterFollowers = require('../src/services/mocks/twitterFollowers');

const assert = chai.assert; 
const expect = chai.expect;  

nock('https://api.twitter.com:443', {"encodedQueryParams":true})
      .get('/1.1/followers/list.json')
      .query({"count":"1"})
      .reply(200, {users:twitterFollowers.users});



describe('twitter service',  () => {
    const mockView = {
        onMessage(){

        }
    }  

    it('gets latest followers', async() => {
        const twitter = new Twitter(mockView);
        const latestFollower = await twitter.getLatestFollower();
        expect(latestFollower.id).to.equal(1238811560593719300);

    });
    
    it('calls on message when new follower', async () => {
        const fakeTime = sinon.useFakeTimers();  
        const onMessageSpy = sinon.spy(mockView, "onMessage");
    
        const twitter = new Twitter(mockView);
        twitter.init();
        await fakeTime.tickAsync(20000);
        const spyCalls = onMessageSpy.getCalls();

        expect(spyCalls.length).to.equal(1);
        expect(onMessageSpy.calledWith({ service: 'twitter', content: 'you have a new follower Aimtech9' })).to.equal(true);
    });
});

