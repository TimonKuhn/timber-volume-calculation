import pandas as pd
import numpy as np
import geopandas

import pyproj
from shapely.geometry import Point, Polygon

# Pfad zum CSV
csv = "inventory.csv"

# Polygon von frontend
Poly = {
    "id": 123,
    "latlngs": [
      {
        "lat": 46.702007297451914,
        "lng": 9.56130136825679
      },
      {
        "lat": 46.702101439174946,
        "lng": 9.564941396002157
      },
      {
        "lat": 46.70008621303538,
        "lng": 9.5649142997537
      },
      {
        "lat": 46.70007469046694,
        "lng": 9.561670052359998
      },
      {
        "lat": 46.702007297451914,
        "lng": 9.56130136825679
      }
    ]
  }

# Polygon erstellen
polylist = []


for i in Poly["latlngs"]:
       l = i['lat']
       b = i['lng']
       polylist.append((l,b))

polygon = Polygon(polylist)


# Koordinatensysteme
in_crs = "EPSG:4326"  # WGS84
out_crs = "EPSG:2056"  # LV95

# Transformation
transformer = pyproj.Transformer.from_crs(in_crs, out_crs)
transformed_coords = [transformer.transform(x, y) for x, y in polygon.exterior.coords]

# transformiertes Polygon
polygon_lv95 = Polygon(transformed_coords)

print(polygon_lv95)
# CSV zu gdf*******************************************************************************************************************************************

df = pd.read_csv(csv, 
                 encoding='utf-8',skiprows=1,
                 names=['x','y','z','id','height'])

gdf = geopandas.GeoDataFrame(df ,geometry=geopandas.points_from_xy(df.x,df.y),crs="EPSG:2056")

print(gdf)

# Bäume in Gebiet*************************************************************************************************************************************************

a = gdf.within(polygon_lv95)

points_in_poly = gdf[a]

trees_in_poly = points_in_poly.mask(df['height']>15)

# Volumen und Anzahl Bäume****************************************************************************************************************************

# Volumen von einem Baum

def calculate_tree_volume(row):
    height = row['height']
    if 15 < height <= 20:
        dia = 25
    elif height <= 25:
        dia = 35
    elif height <= 30:
        dia = 45
    elif height <= 35:
        dia = 60
    elif height <= 40:
        dia = 75
    else:
        dia = 0
    return (dia**2*height)/2

trees_in_poly['tree_volume'] = trees_in_poly.apply(calculate_tree_volume, axis=1)

# Nutzvolumen und Anzahl Bäume berechnen
total_volume = trees_in_poly['tree_volume'].sum()
trees_nr = len(trees_in_poly.index)

# Print Gesamtvolumen
print(f'Nutzvolumen im Gebiet: {total_volume:.0f} m2 von {trees_nr} Bäumen')
