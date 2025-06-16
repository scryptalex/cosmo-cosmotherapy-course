import plotly.graph_objects as go
import pandas as pd
import numpy as np

# Parse the data
scenarios = ["Консервативный", "Реалистичный", "Оптимистичный"]
revenue = [6691000, 13382000, 26764000]

# Convert to millions for display
revenue_millions = [r/1000000 for r in revenue]

# Create color gradient from blue to purple (using brand colors as much as possible)
colors = ['#1FB8CD', '#5D878F', '#944454']

# Create the figure
fig = go.Figure()

# Add the bars
fig.add_trace(go.Bar(
    x=scenarios,
    y=revenue_millions,
    text=[f"{r:.2f}M" for r in revenue_millions],
    textposition='outside',
    marker_color=colors,
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='Прогноз доходности курса космотерапии',
    showlegend=False,
)

# Update axes
fig.update_xaxes(title='Сценарий')
fig.update_yaxes(
    title='Доход (млн ₽)',
    gridcolor='lightgray',
    griddash='dash',
    showgrid=True
)

# Save the chart
fig.write_image("revenue_forecast.png")