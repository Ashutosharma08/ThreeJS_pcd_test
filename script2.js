import * as THREE from './three.module.js'
import {OrbitControls} from './OrbitControls.js'
import { PCDLoader } from './PCDLoader.js'
import * as BufferGeometryUtils from './BufferGeometryUtils.js'

var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(canvas.clientWidth,canvas.clientHeight);

var width = window.screen.availWidth
var height = window.screen.availHeight

var camera = new THREE.PerspectiveCamera(1,width/height,1,50000000);
camera.position.set(0,0,12000);
var loader = new PCDLoader();

var controls = new OrbitControls(camera,renderer.domElement);
var points_geometry = undefined
var load_pcd =  function(){
    loader.load('./arma_Red.pcd',function(points){
        var buffer_geo = new THREE.BufferGeometry()
        buffer_geo.setAttribute('position',new THREE.Float32BufferAttribute(points.geometry.attributes.position.array,3))
        var pts_mat = new THREE.PointsMaterial({color: 0xff00ff})
        points_geometry = new THREE.Points(buffer_geo,pts_mat)
        scene.add(points_geometry)
    })
    
}



var counter = 0
var animate = function(){
    renderer.render(scene,camera)
    controls.update()
    requestAnimationFrame(animate)
    points_geometry.rotation.y += 0.01
    counter +=1
    if (counter == 200){
        points_geometry.material.color.setHex(Math.random() * 0xffffff)
        counter = 0
    }
}

load_pcd()
animate()