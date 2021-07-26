# Zendesk Migration Script

Reference: https://developer.zendesk.com/api-reference/help_center/help-center-api/

## Generate token

- Create new API Token in Admin > Channels > API, make sure token access is enabled.
- Use the following format for the credentials: {email_address}/token:{api_token}
- Afterwards, we base64-encode the resulting string, and put to .env file

```
Authorization: Basic xxxxToken
```

- Note: As we enabled 2-factor authentication in user profile, we'll no longer be able to use username and password to authenticate API requests -> have to use API token.

## Example requests

- Create new category:

```
curl https://ffsupportsg.zendesk.com/api/v2/help_center/en-us/categories.json -u irynav@garena.com/token:{apiToken} -d '{"category": {"position": 2, "locale": "en-us", "name": "Test123", "description": "Test"}}' -X POST -H "Content-Type: application/json"
```

- Delete category:

```
curl https://ffsupportsg.zendesk.com/api/v2/help_center/en-us/categories/4404807769114.json -H "Authorization: Basic xxxToken" -X DELETE
```
