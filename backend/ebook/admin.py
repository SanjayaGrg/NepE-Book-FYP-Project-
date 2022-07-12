from django.contrib import admin
from . import models

admin.site.site_header = "Nep E-Book Administration"


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'ISBN', 'slug', 'author')
    prepopulated_fields = {'slug': ('title',), }


admin.site.register(models.Category)

admin.site.register(models.PostView)
admin.site.register(models.TrendingBooks)
admin.site.register(models.Review)
admin.site.register(models.Slider)
admin.site.register(models.Favorite)
admin.site.register(models.Report)
# admin.site.register(models.Contact)
