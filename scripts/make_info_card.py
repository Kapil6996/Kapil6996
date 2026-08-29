import os

def generate_info_card_svg():
    width = 470
    height = 555
    
    rows = [
        ("USER", "Kapil Kumar (@Kapil6996)", "#38bdf8"),
        ("ROLE", "AI/ML Engineer &amp; Systems Architect", "#a855f7"),
        ("LOCATION", "Gurugram, Delhi NCR, India", "#f43f5e"),
        ("EDUCATION", "B.Tech Undergraduate (AI &amp; ML)", "#fbbf24"),
        ("FEATURED", "Maruti Suzuki FTIR Diagnostic Engine", "#34d399"),
        ("FINTECH", "SahayCredit Alternate Scoring (WASM ML)", "#22d3ee"),
        ("QUANT", "Asset Alpha Trading Engine (Top 5)", "#f472b6"),
        ("TALENT", "SkillGenome X12 Intelligence System", "#60a5fa"),
        ("TRIAGE", "UPLINE Offline-First Emergency PWA", "#a78bfa"),
        ("STACK", "Python • PyTorch • C++ • React • Swift", "#38bdf8"),
        ("PORTFOLIO", "portfolio-mu-rouge-90.vercel.app", "#34d399"),
    ]
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        '  <style>',
        '    .bg { fill: #0d1117; }',
        "    .terminal-title { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px; font-weight: bold; fill: #8b949e; }",
        "    .key { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px; font-weight: bold; }",
        "    .val { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px; fill: #e6edf3; }",
        '  </style>',
        '  <rect width="100%" height="100%" rx="12" class="bg"/>',
        '  <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none" stroke="#30363d" stroke-width="1.5"/>',
        '  <circle cx="20" cy="18" r="5" fill="#ff5f56"/>',
        '  <circle cx="36" cy="18" r="5" fill="#ffbd2e"/>',
        '  <circle cx="52" cy="18" r="5" fill="#27c93f"/>',
        '  <text x="70" y="22" class="terminal-title">kapil@github ~ $ neofetch --profile</text>',
        '  <line x1="15" y1="34" x2="455" y2="34" stroke="#30363d" stroke-width="1"/>',
    ]

    start_y = 58
    step_y = 38
    for i, (key, val, color) in enumerate(rows):
        y = start_y + i * step_y
        delay = 0.05 + i * 0.08
        safe_val = val.replace("&", "&amp;") if "&amp;" not in val else val
        svg.append(f'  <g opacity="0">')
        svg.append(f'    <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="{delay:.2f}s" fill="freeze"/>')
        svg.append(f'    <text x="20" y="{y}" class="key" fill="{color}">{key}:</text>')
        svg.append(f'    <text x="120" y="{y}" class="val">{safe_val}</text>')
        svg.append('  </g>')

    color_y = start_y + len(rows) * step_y + 10
    colors = ["#ff5f56", "#ffbd2e", "#27c93f", "#38bdf8", "#a855f7", "#f43f5e", "#34d399", "#22d3ee"]
    svg.append(f'  <g transform="translate(20, {color_y})">')
    for i, c in enumerate(colors):
        svg.append(f'    <rect x="{i*24}" y="0" width="20" height="12" rx="3" fill="{c}"/>')
    svg.append('  </g>')
    
    svg.append('</svg>')
    
    with open("info-card.svg", "w") as f:
        f.write("\n".join(svg))
    print("Generated info-card.svg successfully!")

if __name__ == "__main__":
    generate_info_card_svg()
