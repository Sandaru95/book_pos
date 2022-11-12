from django.urls import path
from . import views

app_name = "backend"

urlpatterns = [
    path("", views.BackendView.as_view(), name="home"),

    path("item/", views.ItemView.as_view(), name="item"),
    path("item/save/", views.ItemSaveView.as_view(), name="item_save"),
    path("item/delete/", views.ItemDeleteView.as_view(), name="item_delete"),
    path("item/update/", views.ItemUpdateView.as_view(), name="item_update"),

    path("author/", views.AuthorView.as_view(), name="author"),
    path("author/save/", views.AuthorSaveView.as_view(), name="author_save"),
    path("author/update/", views.AuthorUpdateView.as_view(), name="author_update"),
    path("author/delete/", views.AuthorDeleteView.as_view(), name="author_delete"),

    path("publisher/", views.PublisherView.as_view(), name="publisher"),
    path("publisher/save/", views.PublisherSaveView.as_view(), name="publisher_save"),
    path("publisher/update/", views.PublisherUpdateView.as_view(), name="publisher_update"),
    path("publisher/delete/", views.PublisherDeleteView.as_view(), name="publisher_delete"),


    path("book_type/", views.BookTypeView.as_view(), name="book_type"),
    path("book_type/save/", views.BookTypeSaveView.as_view(), name="book_type_save"),
    path("book_type/delete/", views.BookTypeDeleteView.as_view(), name="book_type_delete"),

    path("location/", views.LocationView.as_view(), name="location"),
    path("location/save/", views.LocationSaveView.as_view(), name="location_save"),

    path("sales_report/", views.SalesReportView.as_view(), name="sales_report"),
    path("stock_balance/", views.StockBalanceView.as_view(), name="stock_balance"),

    path("add_stock/", views.AddStockView.as_view(), name="add_stock"),
    path("add_stock/save/", views.AddStockSaveView.as_view(), name="add_stock_save"),

    path("location_transfer/", views.LocationTransferView.as_view(), name="location_transfer"),
    path("invoice/", views.InvoiceView.as_view(), name="invoice"),
    path("inquiry/", views.InquiryView.as_view(), name="inquiry"),
]