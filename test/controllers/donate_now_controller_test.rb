require "test_helper"

class DonateNowControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get donate_now_index_url
    assert_response :success
  end
end
