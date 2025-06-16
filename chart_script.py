import plotly.graph_objects as go

# Data from the provided JSON
lesson_types = ["Видеоуроки", "Космосеансы", "Практики", "Медитации"]
counts = [18, 6, 6, 12]

# Calculate total for percentage reference
total = sum(counts)

# Create the pie chart with cosmic-themed colors from the brand palette
# Using blues, purples and similar cosmic colors from the available brand colors
fig = go.Figure(data=[go.Pie(
    labels=lesson_types,
    values=counts,
    textinfo='percent+value',
    hoverinfo='label+percent+value',
    marker=dict(colors=['#1FB8CD', '#5D878F', '#944454', '#13343B'])  # Using blue/purple tones from brand colors
)])

# Update layout
fig.update_layout(
    title="Структура курса космотерапии",
    uniformtext_minsize=14, 
    uniformtext_mode='hide'
)

# Save the chart as PNG
fig.write_image("cosmotherapy_course_structure.png")

# Display the chart
fig