describe("Log In", () => {
  const user = cy;
  it("should see login page", () => {
    user.visit("/").title().should("eq", "Login | Uber Eats");
  });
  it("can fill out the form", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("jace@naver.com");
    user.findByPlaceholderText(/password/i).type("1q2w3e4r5t");
    user.findByRole("button").should("not.have.class", "pointer-events-none");
  });

  it("can see email / password validation errors", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("bade@email");
    user.findByRole("alert").should("have.text", "Please enter a valid email");
  });
});
