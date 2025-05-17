class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :about, :donations]

  def index
  end

  def about
  end

  def donations
  end
end
