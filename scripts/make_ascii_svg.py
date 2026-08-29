import os
import requests
from PIL import Image

def generate_ascii_svg():
    img_url = "https://raw.githubusercontent.com/Kapil6996/Kapil6996.github.io/main/Screenshot_20251101_111305.jpg"
    img_path = "scripts/profile_source.jpg"
    
    os.makedirs("scripts", exist_ok=True)
    if not os.path.exists(img_path):
        try:
            r = requests.get(img_url, timeout=10)
            if r.status_code == 200:
                with open(img_path, "wb") as f:
                    f.write(r.content)
        except Exception as e:
            print(f"Error fetching photo: {e}")
            
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("L")
    else:
        img = Image.new("L", (100, 100), 128)

    target_cols = 64
    aspect = img.height / img.width
    target_rows = int(target_cols * aspect * 0.48)
    target_rows = max(34, min(48, target_rows))
    
    img = img.resize((target_cols, target_rows), Image.Resampling.LANCZOS)
    
    RAMP = " .`:-=+*cs#%@"
    
    lines = []
    for y in range(target_rows):
        line = ""
        for x in range(target_cols):
            lum = img.getpixel((x, y))
            idx = int((lum / 255) * (len(RAMP) - 1))
            line += RAMP[idx]
        lines.append(line)
        
    font_size = 9.0
    char_width = 5.5
    line_height = 10.5
    width = 380
    height = int(target_rows * line_height + 55)
    
    svg_lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        '  <style>',
        '    .bg { fill: #0d1117; }',
        '    .ascii-text {',
        "      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;",
        f'      font-size: {font_size}px;',
        '      font-weight: 600;',
        '      fill: #22d3ee;',
        '      white-space: pre;',
        '    }',
        '  </style>',
        f'  <rect width="100%" height="100%" rx="12" class="bg"/>',
        f'  <rect x="0" y="0" width="{width}" height="{height}" rx="12" fill="none" stroke="#30363d" stroke-width="1.5"/>',
        '  <circle cx="20" cy="18" r="5" fill="#ff5f56"/>',
        '  <circle cx="36" cy="18" r="5" fill="#ffbd2e"/>',
        '  <circle cx="52" cy="18" r="5" fill="#27c93f"/>',
        '  <text x="70" y="22" font-family="monospace" font-size="11" fill="#8b949e" font-weight="bold">kapil_ascii_portrait.sh</text>',
        '  <g transform="translate(15, 45)" class="ascii-text">'
    ]
    
    total_duration = 2.5
    row_delay_step = total_duration / target_rows
    
    for i, line in enumerate(lines):
        y_pos = (i + 1) * line_height
        delay = i * row_delay_step
        escaped_line = line.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        svg_lines.append(f'    <text x="0" y="{y_pos:.1f}" opacity="0">')
        svg_lines.append(f'      <animate attributeName="opacity" from="0" to="1" dur="0.1s" begin="{delay:.2f}s" fill="freeze"/>')
        svg_lines.append(f'      {escaped_line}')
        svg_lines.append('    </text>')

    svg_lines.append('  </g>')
    svg_lines.append('</svg>')
    
    svg_content = "\n".join(svg_lines)
    
    with open("kapil-ascii.svg", "w") as f:
        f.write(svg_content)
    print("Generated kapil-ascii.svg successfully!")

if __name__ == "__main__":
    generate_ascii_svg()
