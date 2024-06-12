function addRoom() {
    // Serialize form data
    let formData = $('#add-server-form').serialize();
    
    // Send AJAX request
    $.ajax({
      type: 'POST',
      url: $('#add-server-form').attr('action'),
      data: formData,
      
      success: function(response) {
        console.log(response);
        // Handle success, if needed
      },
      error: function(xhr, status, error) {
        console.error(xhr.responseText);
        // Handle error, if needed
      }
    });
  }
  