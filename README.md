test POST request
curl -X POST -H "Content-Type: application/json" \
 -d '{"commits": [{"message": "message content"}], "pusher": {"name": "test" }, "repository": {"name": "repo name"} }' \
https://5fb6-143-159-11-155.ngrok.io/hook/jon/github
