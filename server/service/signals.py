from django.db.models.signals import post_save
from django.dispatch import receiver
from service.models import ServiceTokenPermissionModel, ServiceTokenModel


@receiver(post_save, sender=ServiceTokenModel)
def create_user(sender, instance, created, **kwargs):
    if created:
        ServiceTokenPermissionModel.objects.create(token=instance)
