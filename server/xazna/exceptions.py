from rest_framework.exceptions import APIException


class CustomAPIException(APIException):

    def __init__(self, data, status=400):
        self.status_code = status
        self.detail = data

class CustomException(Exception):

    def __init__(self, message, status=400):
        self.message = message
        self.status = status
        super().__init__(message)