# Generated by Django 5.1.3 on 2024-11-20 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_notesmodel_title_alter_qnamodel_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='qnamodel',
            name='context',
            field=models.TextField(blank=True, null=True),
        ),
    ]