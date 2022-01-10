export function success(title = "Good job!", text = "Proident esse adipisicing.") {
    Swal.fire({
      title,
      text,
      icon: "success",
    });
  }
  
  export function error(title = "Error!", text = "Proident esse adipisicing.") {
    Swal.fire({
      title,
      text,
      icon: "error",
    });
  }
  
  export function warning(
    title = "Warning!",
    text = "Proident esse adipisicing."
  ) {
    Swal.fire({
      title,
      text,
      icon: "warning",
    });
  }
  
  export function info(title = "Info!", text = "Proident esse adipisicing.") {
    Swal.fire({
      title,
      text,
      icon: "info",
    });
  }
  
  export function question(
    title = "Question!",
    text = "Do you want to continue"
  ) {
    Swal.fire({
      title,
      text,
      icon: "question",
    });
  }