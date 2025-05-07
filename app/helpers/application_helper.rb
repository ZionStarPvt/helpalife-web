module ApplicationHelper
  def bootstrap_flash_class(key)
    {
      notice: 'alert-success',
      alert: 'alert-danger',
      error: 'alert-warning'
    }[key.to_sym] || 'alert-info'
  end
end
