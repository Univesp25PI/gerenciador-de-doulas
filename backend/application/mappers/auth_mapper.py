from interface.api.schemas.auth_schema import TokenResponse


class AuthMapper:
    @staticmethod
    def token_to_response(token: str):
        return TokenResponse(access_token=token)