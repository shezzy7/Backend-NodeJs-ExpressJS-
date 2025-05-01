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

