# Generated by Django 5.1.4 on 2025-02-09 10:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0003_alter_category_display_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='parent_category',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='category.category'),
        ),
    ]
