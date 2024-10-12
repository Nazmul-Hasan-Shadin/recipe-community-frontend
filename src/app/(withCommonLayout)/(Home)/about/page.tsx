"use client";
import React from "react";

const About = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "70%", margin: "0 auto" }}>
        {/* Introduction Section */}
        <section style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#ff6a33",
              marginBottom: "1rem",
            }}
          >
            About Us
          </h1>
          <p style={{ fontSize: "1.125rem", color: "gray" }}>
            Welcome to our Cooking Community! We are a platform that connects
            food enthusiasts, home cooks, and professional chefs from around the
            world. Here, you can share your favorite recipes, learn new cooking
            techniques, and participate in a vibrant culinary community.
          </p>
        </section>

        {/* Mission Section */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ff6a33",
              marginBottom: "1rem",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "gray",
              lineHeight: "1.5",
              marginBottom: "1rem",
            }}
          >
            Our mission is to inspire and empower individuals through the joy of
            cooking. We believe that cooking is not just a necessity but an art
            form that brings people together. Our goal is to create an inclusive
            environment where everyone can express their creativity and passion
            for food.
          </p>
          <p style={{ fontSize: "1rem", color: "gray", lineHeight: "1.5" }}>
            Join us in celebrating the culinary arts, sharing knowledge, and
            building friendships over delicious meals.
          </p>
        </section>

        {/* Team Section */}
        <section>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ff6a33",
              marginBottom: "1rem",
            }}
          >
            Meet Our Team
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {/* Team Member 1 */}
            <div
              style={{
                maxWidth: "300px",
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "lightgray",
                marginBottom: "1.5rem",
              }}
            >
              <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src="https://www.wallpaperflare.com/static/183/937/164/gerard-butler-man-brunette-coat-wallpaper-preview.jpg "
                alt="Team Member 1"
              />
              <div style={{ padding: "1rem" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Nazmul Hasan Shadin
                </div>
                <p style={{ color: "gray", fontSize: "1rem" }}>
                  Co-Founder & Chef. Passionate about sharing culinary knowledge
                  and experiences.
                </p>
              </div>
            </div>
            {/* Team Member 2 */}
            <div
              style={{
                maxWidth: "300px",
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "lightgray",
                marginBottom: "1.5rem",
              }}
            >
              <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src="	https://i0.wp.com/picjumbo.com/wp-content/uploads/…ican-man-in-suit-free-photo.jpg?w=2210&quality=70"
                alt="Team Member 2"
              />
              <div style={{ padding: "1rem" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  John Doe
                </div>
                <p style={{ color: "gray", fontSize: "1rem" }}>
                  Head of Community. Loves connecting people through food and
                  recipes.
                </p>
              </div>
            </div>
            {/* Team Member 3 */}
            <div
              style={{
                maxWidth: "300px",
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "lightgray",
                marginBottom: "1.5rem",
              }}
            >
              <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src="	https://i0.wp.com/picjumbo.com/wp-content/uploads/…ican-man-in-suit-free-photo.jpg?w=2210&quality=70"
                alt="Team Member 3"
              />
              <div style={{ padding: "1rem" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Jane Smith
                </div>
                <p style={{ color: "gray", fontSize: "1rem" }}>
                  Content Creator. Excited to share delicious recipes and
                  cooking tips.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section style={{ textAlign: "center", marginTop: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ff6a33",
              marginBottom: "1rem",
            }}
          >
            Join Our Community!
          </h2>
          <p
            style={{ fontSize: "1rem", color: "gray", marginBottom: "1.5rem" }}
          >
            Become part of our vibrant community and explore a world of culinary
            creativity. Share your recipes, discover new dishes, and connect
            with fellow food lovers.
          </p>
          <button
            style={{
              backgroundColor: "#ff6a33",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "orange")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff6a33")
            }
          >
            Get Started
          </button>
        </section>

        {/* Footer Section */}
        <footer
          style={{
            textAlign: "center",
            padding: "1.5rem",
            borderTop: "1px solid lightgray",
            marginTop: "3rem",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "gray" }}>
            © 2024 Cooking Community. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
