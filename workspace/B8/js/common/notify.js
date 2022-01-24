export function success(
  title = "Good job!",
  text = "Proident esse adipisicing."
) {
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

export async function confirm(title, titleSuccess, callbackFn) {
  const result = await Swal.fire({
    title,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    await callbackFn();
    Swal.fire("Deleted!", titleSuccess, "success");
  }
}