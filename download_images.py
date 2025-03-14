import requests
import os
from urllib.parse import urljoin

# Create directory if it doesn't exist
image_dir = 'core/static/core/images/careers'
os.makedirs(image_dir, exist_ok=True)

# Dictionary of career paths and their corresponding Unsplash search terms
career_images = {
    'tech.jpg': 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80',
    'healthcare.jpg': 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80',
    'business.jpg': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    'creative.jpg': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
}

# Download images
for filename, url in career_images.items():
    response = requests.get(url)
    if response.status_code == 200:
        filepath = os.path.join(image_dir, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f'Successfully downloaded {filename}')
    else:
        print(f'Failed to download {filename}') 