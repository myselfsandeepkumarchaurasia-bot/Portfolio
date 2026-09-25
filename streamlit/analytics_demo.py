"""
Sandeep Kumar Chaurasiya - HR & Workforce Attrition Analytics (Streamlit Demo)
Framework: Streamlit, Pandas, Power BI Concept Modeling, SQL Extraction Views
"""

import streamlit as st
import pandas as pd

st.set_page_config(
    page_title="HR & Workforce Analytics | Sandeep AI Lab",
    page_icon="📊",
    layout="wide",
)

st.title("📊 HR & Workforce Attrition Intelligence")
st.caption("Enterprise BI Suite with Star Schema Modeling & Departmental Slicers")

dept = st.sidebar.selectbox("Filter by Department", ["All Departments", "AI & Data", "Engineering", "Operations", "Product"])
year = st.sidebar.selectbox("Fiscal Year", ["2025", "2024"])

col1, col2, col3, col4 = st.columns(4)
col1.metric("Active Headcount", "284", "+14% YoY")
col2.metric("Annualized Attrition", "8.4%", "-2.1% MoM")
col3.metric("Employee Satisfaction", "4.6 / 5.0", "Top Quartile")
col4.metric("Avg Tenure", "3.4 Yrs", "Stable")

st.subheader("Departmental Turnover Velocity")
chart_data = pd.DataFrame({
    "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "Departure Rate (%)": [1.2, 0.9, 0.6, 0.8, 0.5, 0.7]
})
st.bar_chart(chart_data.set_index("Month"))
