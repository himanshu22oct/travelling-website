<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $feedbackType = htmlspecialchars($_POST["feedbackType"]);
    $rating = isset($_POST["stars"]) ? intval($_POST["stars"]) : "N/A";
    $message = htmlspecialchars($_POST["message"]);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Email recipient
    $to = "your-email@example.com"; // Replace with your actual email
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Email subject
    $subject = "New Feedback Received - $feedbackType";
    
    // Email body
    $body = "Name: $name\nEmail: $email\nFeedback Type: $feedbackType\nRating: $rating\nMessage:\n$message";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Feedback submitted successfully!";
    } else {
        echo "Failed to submit feedback. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
