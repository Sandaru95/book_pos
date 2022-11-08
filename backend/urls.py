from django.urls import path
from . import views

app_name = "backend"

urlpatterns = [
    path("", views.BackendView.as_view(), name="backend"),
    path("item/", views.ItemView.as_view(), name="item"),
    path("author/", views.AuthorView.as_view(), name="author"),
    path("publisher/", views.PublisherView.as_view(), name="publisher"),
    path("book_type/", views.BookTypeView.as_view(), name="book_type"),
    path("location/", views.LocationView.as_view(), name="location"),
    path("cashier/", views.CashierView.as_view(), name="cashier"),
    path("sales_report/", views.SalesReportView.as_view(), name="sales_report"),
    path("stock_balance/", views.StockBalanceView.as_view(), name="stock_balance"),
    path("add_stock/", views.AddStockView.as_view(), name="add_stock"),
    path("location_transfer/", views.LocationTransferView.as_view(), name="location_transfer"),
    path("invoice/", views.InvoiceView.as_view(), name="invoice"),
    path("inquiry/", views.InquiryView.as_view(), name="inquiry"),
]