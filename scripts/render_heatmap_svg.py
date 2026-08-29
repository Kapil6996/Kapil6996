import json
import os

def render_heatmap_svg():
    json_path = "data/contributions.json"
    if not os.path.exists(json_path):
        from fetch_contributions import fetch_contributions
        fetch_contributions()
        
    with open(json_path, "r") as f:
        data = json.load(f)
        
    days = data.get("days", [])
    username = data.get("username", "Kapil6996")
    total = data.get("total_contributions", 1420)
    
    PALETTE = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353", "#69f0a0"]
    
    width = 860
    height = 200
    
    box_size = 11.5
    gap = 3.5
    start_x = 35
    start_y = 52
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        '  <style>',
        '    .bg { fill: #0d1117; }',
        "    .title { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: bold; fill: #8b949e; }",
        "    .subtext { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; fill: #38bdf8; font-weight: 600; }",
        "    .label { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 9px; fill: #7d8590; }",
        '    .day-box { rx: 2.5px; ry: 2.5px; }',
        '  </style>',
        f'  <rect width="100%" height="100%" rx="12" class="bg"/>',
        f'  <rect x="0" y="0" width="{width}" height="{height}" rx="12" fill="none" stroke="#30363d" stroke-width="1.5"/>',
        '  <circle cx="20" cy="18" r="5" fill="#ff5f56"/>',
        '  <circle cx="36" cy="18" r="5" fill="#ffbd2e"/>',
        '  <circle cx="52" cy="18" r="5" fill="#27c93f"/>',
        f'  <text x="70" y="22" class="title">kapil@github ~ $ ./contributions.sh --user {username}</text>',
        f'  <text x="{width - 240}" y="22" class="subtext">{total:,}+ contributions in the last year</text>',
        '  <line x1="15" y1="36" x2="845" y2="34" stroke="#30363d" stroke-width="1"/>',
    ]

    # Month & Day Labels
    svg.append('  <g class="label">')
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    for m_idx, m_name in enumerate(months):
        m_x = start_x + m_idx * (53 * (box_size + gap) / 12)
        svg.append(f'    <text x="{m_x:.1f}" y="{start_y - 6}">{m_name}</text>')
        
    day_labels = [("Mon", 1), ("Wed", 3), ("Fri", 5)]
    for d_name, d_row in day_labels:
        d_y = start_y + d_row * (box_size + gap) + 9
        svg.append(f'    <text x="10" y="{d_y:.1f}">{d_name}</text>')
    svg.append('  </g>')

    # Grid Cells
    svg.append('  <g>')
    week = 0
    day_in_week = 0
    for idx, d in enumerate(days):
        level = min(d.get("level", 0), len(PALETTE) - 1)
        color = PALETTE[level]
        
        x = start_x + week * (box_size + gap)
        y = start_y + day_in_week * (box_size + gap)
        
        # Diagonal slide-in delay
        delay = (week * 0.035) + (day_in_week * 0.015)
        
        svg.append(f'    <rect x="{x:.1f}" y="{y:.1f}" width="{box_size}" height="{box_size}" fill="{color}" class="day-box" opacity="0">')
        svg.append(f'      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="{delay:.2f}s" fill="freeze"/>')
        svg.append(f'      <title>{d.get("date")}: {d.get("count")} contributions</title>')
        svg.append('    </rect>')
        
        day_in_week += 1
        if day_in_week >= 7:
            day_in_week = 0
            week += 1
            if week >= 53:
                break
    svg.append('  </g>')

    # Footer Legend
    legend_y = height - 16
    svg.append('  <g class="label">')
    svg.append(f'    <text x="{start_x}" y="{legend_y + 9}">Learn how Kapil builds AI &amp; Systems → portfolio-mu-rouge-90.vercel.app</text>')
    svg.append(f'    <text x="{width - 155}" y="{legend_y + 9}">Less</text>')
    for i, c in enumerate(PALETTE):
        lx = width - 125 + i * 14
        svg.append(f'    <rect x="{lx}" y="{legend_y}" width="11" height="11" rx="2" fill="{c}"/>')
    svg.append(f'    <text x="{width - 35}" y="{legend_y + 9}">More</text>')
    svg.append('  </g>')
    
    svg.append('</svg>')
    
    with open("contrib-heatmap.svg", "w") as f:
        f.write("\n".join(svg))
    print("Generated contrib-heatmap.svg successfully!")

if __name__ == "__main__":
    render_heatmap_svg()
