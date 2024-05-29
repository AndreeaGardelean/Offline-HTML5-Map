OpenStreetMap data representation
-----------------------------------

OpenStreetMap data is saved in a .osm file format, which is specific to OpenStreetMap, is coded in XML and contains raw geographical data in a strutured and ordered format [1]. This file type is designed to be sent and received over the internet easily and fast in a standard format [1]. 

Files with extension .pbf and .bz2 are also .osm files, however these are .osm compressed files [1].

In the project .osm.pbf files are used for rendering the vector tiles.

The following code snippets are raw OSM data which was retrieved though the Overpass API in OSMData Proof of Concept:
Note: some of the output has been truncated beacuse it was very large, and for illustration purposes the data below suffices. Where the output has been truncated is denoted by '...'

A query to retrieve OSM data of London museums has returned the data in different elements such as: node, way and relations all which have tags.

Let's see what they represent:
1. Node
    A node is used to represent a specific point, is defined by its latitude and longitude, and a unique node id [2].

    Above The Sherlock Holmes Museum and shop was represented as a node.

2. Way
   A way is an ordered list which contains between 2 and 2000 nodes used to define a polyline [1]. 
   
   There are 3 different ways:
   1. Open-way is a linear representation of a feature where the first and last node are not identical [3]. Often used to represent roads, rivers train tracks etc. 
   
   2. Closed-way polyline is where the first and last node are identical [3].
   
   3. Area which is also knows as a polygon, 'is an enclosed filled area or teritory' [3], they often have a tag 'area=yes', however there are some exceptions. Used to represent closed areas such a large building, parks etc.

3. Relations
    A relation is used to define geographic relations between different objects. The objects are represented by a group of members which contain multiple nodes [4].

4. Tags
    Tags are used to describe a particular element (node, way, relations) [5]. Every tag has 2 fields: key 'k' and a value 'v', and the key must be unique.

After retrieving all museums from London not all museums have been represented the same.

For example The Sherlock Holmes Museum and shop was represented by a node:

```
  <node id="3916613190" lat="51.5237629" lon="-0.1584743">
    <tag k="addr:city" v="London"/>
    <tag k="addr:housenumber" v="221b"/>
    <tag k="addr:street" v="Baker Street"/>
    <tag k="fee" v="yes"/>
    <tag k="level" v="0-1"/>
    <tag k="name" v="The Sherlock Holmes Museum and shop"/>
    <tag k="name:en" v="Sherlock Holmes Museum"/>
    <tag k="name:zh" v="福爾摩斯博物館"/>
    <tag k="opening_hours" v="Mo-Su 09:30-18:00"/>
    <tag k="phone" v="+44 20 7224 3688"/>
    <tag k="tourism" v="museum"/>
    <tag k="website" v="https://www.sherlock-holmes.co.uk/"/>
    <tag k="wheelchair" v="no"/>
    <tag k="wikidata" v="Q1990172"/>
  </node>
```
And has multiple tags which describe the location, such as name (which is available in multiple languages), website, opening hours and others.

Whilst the Science Museum was represented by an open-way, notice the first and last node are not identical:

```
  <way id="27765411">
    <bounds minlat="51.4969551" minlon="-0.1783304" maxlat="51.4978392" maxlon="-0.1741311"/>
    <nd ref="807945751" lat="51.4969551" lon="-0.1782508"/>
    <nd ref="304884794" lat="51.4973377" lon="-0.1783304"/>
    ...
    <nd ref="807945751" lat="51.4969551" lon="-0.1782508"/>
    <tag k="addr:housename" v="Science Museum"/>
    <tag k="building" v="public"/>
    <tag k="building:levels" v="3"/>
    <tag k="changing_table" v="yes"/>
    <tag k="changing_table:location" v="wheelchair_toilet"/>
    <tag k="check_date" v="2022-09-18"/>
    <tag k="fee" v="no"/>
    <tag k="name" v="Science Museum"/>
    <tag k="name:de" v="Wissenschaftsmuseum"/>
    <tag k="name:en" v="Science Museum"/>
    <tag k="name:es" v="Museo de Ciencias"/>
    <tag k="name:fr" v="Musée de la science"/>
    <tag k="name:he" v="מוזיאון המדע"/>
    <tag k="name:it" v="Museo della scienza"/>
    <tag k="name:uk" v="Музей науки"/>
    <tag k="opening_hours" v="Mo-Su 10:00-18:00"/>
    <tag k="roof:levels" v="2"/>
    <tag k="roof:shape" v="quadruple_saltbox"/>
    <tag k="toilets:wheelchair" v="yes"/>
    <tag k="tourism" v="museum"/>
    <tag k="website" v="https://www.sciencemuseum.org.uk/"/>
    <tag k="wheelchair" v="limited"/>
    <tag k="wikidata" v="Q674773"/>
    <tag k="wikipedia" v="en:Science Museum (London)"/>
  </way>
```

The British Museum was represented by a relation, most probably because is such a large building, and in order to define the outline properly was required to be represented by a relation:
```
  <relation id="177044">
    <bounds minlat="51.5180530" minlon="-0.1289022" maxlat="51.5205483" maxlon="-0.1248778"/>
    <member type="way" ref="37909715" role="inner">
      <nd lat="51.5192654" lon="-0.1261622"/>
      <nd lat="51.5191322" lon="-0.1264629"/>
      <nd lat="51.5191002" lon="-0.1265345"/>
      <nd lat="51.5190550" lon="-0.1266358"/>
      <nd lat="51.5188984" lon="-0.1269960"/>
      <nd lat="51.5195940" lon="-0.1277872"/>
      <nd lat="51.5197185" lon="-0.1274980"/>
      <nd lat="51.5197824" lon="-0.1273538"/>
      <nd lat="51.5198527" lon="-0.1271951"/>
      <nd lat="51.5199606" lon="-0.1269526"/>
      <nd lat="51.5192654" lon="-0.1261622"/>
    </member>
    ...
    <member type="way" ref="37909796" role="outer">
      <nd lat="51.5196390" lon="-0.1269850"/>
      <nd lat="51.5196283" lon="-0.1268722"/>
      <nd lat="51.5195930" lon="-0.1267733"/>
      <nd lat="51.5195378" lon="-0.1267016"/>
      <nd lat="51.5194702" lon="-0.1266668"/>
      <nd lat="51.5193994" lon="-0.1266735"/>
      <nd lat="51.5193349" lon="-0.1267210"/>
      <nd lat="51.5192853" lon="-0.1268026"/>
      <nd lat="51.5192575" lon="-0.1269076"/>
      <nd lat="51.5192552" lon="-0.1270215"/>
      <nd lat="51.5192786" lon="-0.1271292"/>
      <nd lat="51.5193246" lon="-0.1272160"/>
      <nd lat="51.5193871" lon="-0.1272701"/>
      <nd lat="51.5194575" lon="-0.1272844"/>
      <nd lat="51.5195263" lon="-0.1272569"/>
      <nd lat="51.5195844" lon="-0.1271912"/>
      <nd lat="51.5196237" lon="-0.1270963"/>
      <nd lat="51.5196390" lon="-0.1269850"/>
    </member>
    <tag k="addr:city" v="London"/>
    <tag k="addr:country" v="GB"/>
    <tag k="addr:postcode" v="WC1B 3DG"/>
    <tag k="addr:street" v="Great Russell Street"/>
    ...
    <tag k="historic" v="yes"/>
    <tag k="importance" v="international"/>
    <tag k="inscription_date" v="1951-10-24"/>
    <tag k="internet_access" v="wlan"/>
    <tag k="listed_status" v="Grade I"/>
    <tag k="museum" v="archaeological"/>
    <tag k="name" v="British Museum"/>
    ...
    <tag k="name:zh" v="大英博物馆"/>
    <tag k="opening_hours" v="Mo-Th,Sa-Su 10:00-17:30; Fr 10:00-20:30"/>
    ...
    <tag k="wikidata" v="Q6373"/>
    <tag k="wikimedia_commons" v="Category:British Museum"/>
    <tag k="wikipedia" v="en:British Museum"/>
    <tag k="year_of_construction" v="1823 - 1847"/>
  </relation>
```

As seen in the examples above even though the locations are the same type they are not represented the same, and factors such as size can affect what elelemnts are used to represent these locations.


Vector vs. image tile maps
--------------------------

### Vector tile maps

In vector tiles, the geospatial data is represented by vectors objects such as points, lines and poligons [6] or node, ways and relations in the case of OSM data, as seen above. 

Vector tiles need to be processed and generated from the OSM raw data, and OpenMapTiles does just that. OpenMapTiles is an open-source project which generates packages containing vector tiles for the given OSM data [7].

One such format is .mbtiles, which stores the rendered vector map tiles into a single file, and can be used as a source for offline context [8].

The generated tiles are stored on the server and then rendered on the client side, however is important to note that this data does not contain any information for rendering and tools such as OpenLayers can be used to render the vector tiles on the client side.

In mapping systems, as the user zooms into the map the level of detail increases and updates accordingly while the visualized area dicreases [11].

The vector tiles are decomposed in multiple tiles each corresponding to a certain area as shown in Figure 1 below. 
![Figure 1 - Principle of vector tiling [10]](images/vectorTile.jpeg)

When the map is zoomed in new vector data is requested for the required zoom level, showing more detail for the chosen area [10].

### Image tile maps
Image tile maps are commonly knows as raster tiles because they come in raster format (as images).
The raster tiles are generated for each zoom level separately, and the number of tiles increases by a factor of 4 for each zoom level [6].

Rendering raster tiles requires computational power, for this reason they are rendered in advance on the server-side and served to the end-user [9].

Raster tiles are arranged next to eachother, ordered in a pyramid scheme; as the level of detail increases the number of tiles which form the map increases by a factor of 4 at each zoom level, as shown below in Figure 1 [10]. 
![Figure 2 - Tile pyramid [10]](images/tilePyramid.jpeg)


### Vector vs Image map tiles
Both vector tiles and raster tiles have their advantages and disatvanges. Below we will explore such aspects.

Raster tiles are time and resource consuming because it requires to generate a new tile for each zoom level, if data, labelling or styling changes for a certain area then the tiles need to be re-generated for that specific area.
Geospatial calculations such as route mapping cannot be performed because it does not contain any geographical data.

In contrast, vector tiles are more flexible and all the above identified issues in raster tiles can be easily done with vector tiles. Because vector tiles are composed of geographical data, making the necessary data updates would update the tiles, without having to re-generate the tiles. The styling of the map can be manipulated on client-side, and having customised design is more affordable comparing with vector tiles. 

Vector tiles are smaller in size than raster tiles, have faster loading time, invisible zoom levels and a smooth zooming experience with high-resolution without increasing the file size [9]. Because vector tiles are rendered on the client-side it requires more powerful hardware on the user end  while raster tiles do not because they are rendered on server-side[9].


### References

[1] LearnOSM. File Formats [Online]. Available: https://learnosm.org/en/osm-data/file-formats/

[2] OpenStreetMap Wiki (23/09/2023). Node [Online]. Available: https://wiki.openstreetmap.org/wiki/Node

[3] OpenStreetMap Wiki (05/09/2023). Way [Online]. Available: https://wiki.openstreetmap.org/wiki/Way

[4] OpenStreetMap Wiki (14/11/2023). Relation [Online]. Available: https://wiki.openstreetmap.org/wiki/Relation

[5] OpenStreetMap Wiki (03/11/2023). Elements [Online]. Available: https://wiki.openstreetmap.org/wiki/Elements

[6] R. Netek, J. Masopust, F. Pavlicek, V. Pechanec. (2020, 02). "PErformance Testing on Vector vs. Raster Map Tiles-Comparative Study on Load Metrics". Geospatial Online Applications and Services [Online]. Available: https://www.mdpi.com/2220-9964/9/2/101

[7] OpenMapTiles. About the project [Online]. Available: https://openmaptiles.org/about/

[8] Hot Export Tool. Export Formats [Online]. Available: https://export.hotosm.org/en/v3/learn/export_formats#mbtiles

[9] Maptiler (10/2023). Raster vs Vector Map Tiles: What Is the Difference Between the Two Data Types? [Online]. Available: https://documentation.maptiler.com/hc/en-us/articles/4411234458385-Raster-vs-Vector-Map-Tiles-What-Is-the-Difference-Between-the-Two-Data-Types-

[10] Gaffuri, J. (2012). Toward Web Mapping with Vector Data. In: Xiao, N., Kwan, MP., Goodchild, M.F., Shekhar, S. (eds) Geographic Information Science. GIScience 2012. Lecture Notes in Computer Science, vol 7478. Springer, Berlin, Heidelberg. [Online]. Available: https://doi.org/10.1007/978-3-642-33024-7_7https://link.springer.com/chapter/10.1007/978-3-642-33024-7_7

[11] García, R., de Castro, J. P., Verdú, E., Verdú, M. J., & Regueras, L. M. (2012). Web map tile services for spatial data infrastructures: Management and optimization. In
Cartography-a tool for spatial analysis [Online]. InTech. Available: https://mts.intechopen.com/storage/books/2325/authors_book/authors_book.pdf

[12] De Beukelaar, I.T.Y. (2018). Cartographic implications of Vector Tile technology (Unpublished
master’s thesis). Geographical Information Management and Applications (GIMA MSc) [Online]. Available: https://studenttheses.uu.nl/bitstream/handle/20.500.12932/30601/GIMA_MSc_Thesis_IngmarDeBeukelaar.pdf?sequence=2&isAllowed=y