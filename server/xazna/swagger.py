from drf_yasg.inspectors import SwaggerAutoSchema

class PrefixTagAutoSchema(SwaggerAutoSchema):
    def get_tags(self, operation_keys=None):
        if self.path:
            path_parts = self.path.strip("/").split("/")
            if path_parts:
                return [path_parts[1].capitalize()]
        return super().get_tags(operation_keys)
