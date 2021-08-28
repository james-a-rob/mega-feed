const nock = require('nock');
const chai = require('chai');  
const sinon = require('sinon');

const Twitter = require('../src/services/twitter');
const twitterFollowers = require('../src/services/mocks/twitterFollowers');
const assert = chai.assert; 
const expect = chai.expect;  




describe('twitter service',  () => {
    const mockView = {
        onMessage(){

        }
    }  


    it('gets latest followers', async () => {

        nock('https://api.twitter.com:443', {"encodedQueryParams":true})
            .get('/1.1/followers/list.json')
            .query({"count":"1"})
            .times(1)
            .reply(200, {users:twitterFollowers.users}).persist(false);


        const twitter = new Twitter(mockView);
        const latestFollower = await twitter.getLatestFollower();
        expect(latestFollower.id).to.equal(1238811560593719300);

    });
    
    it('calls on message when new follower', async () => {
        const clock = sinon.useFakeTimers();  


        const onMessageSpy = sinon.spy(mockView, "onMessage");

    
        const twitter = new Twitter(mockView);
        const getLatestFollowerStub1 = sinon.stub().callsFake(function fakeFn() {
            return {id: "1234", screen_name: "bob"};
        });

        const getLatestFollowerStub2 = sinon.stub().callsFake(function fakeFn() {
            return {id: "5678", screen_name: "Aimtech9"};
        });
        twitter.getLatestFollower = getLatestFollowerStub1;

        await twitter.init()
        await clock.tickAsync(10000);
        twitter.getLatestFollower = getLatestFollowerStub2;
        await clock.tickAsync(10000);

        const spyCalls = onMessageSpy.getCalls();

        expect(spyCalls.length).to.equal(1);
        expect(onMessageSpy.calledWith({ service: 'twitter', content: 'you have a new follower Aimtech9' })).to.equal(true);

    });
});

