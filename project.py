from langchain_google_genai import ChatGoogleGenerativeAI



import streamlit as st



gemini_api_key="AIzaSyDzhRbup3PIpImHLKnVhawfpYTX-3Ep-bM"

model = ChatGoogleGenerativeAI(
    model = "gemini-2.0-flash",
    google_api_key = gemini_api_key
)
st.header("Made with Love for MADNI JAM")

input_text = st.text_input("Ask anything")

if st.button("Send request"):
    result = model.invoke(input_text)

    st.write(result.content)

# Spacer to push footer to the bottom
st.markdown("<br><br><br><br><br><br><br>", unsafe_allow_html=True)

# Footer with custom HTML and CSS
st.markdown("""
    <style>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #f1f1f1;
        color: #333;
        text-align: center;
        padding: 10px;
        font-size: 14px;
        border-top: 1px solid #ccc;
    }
    </style>
    <div class="footer">
        © 2025 Made by Shahzad 
    </div>
""", unsafe_allow_html=True)