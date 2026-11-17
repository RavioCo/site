export const VS = /* glsl */ `
uniform float uT,uS;uniform vec2 uM;varying vec3 vN;varying vec2 vU;varying float vH;
float h(vec2 p){float t=uT*.18;float a=sin(p.x*1.3+t+sin(p.y*.8+t*.7)*1.2)*.32;a+=sin(p.x*2.7-p.y*1.9+t*1.3)*.12;a+=sin(p.y*3.1+p.x*.6-t)*.06;float d=distance(p,uM);a+=exp(-d*d*1.6)*.28;return a*(1.0+uS*.8);}
void main(){vU=uv;vec3 p=position;float e=.01;float z=h(p.xy);float dx=h(p.xy+vec2(e,0.))-z;float dy=h(p.xy+vec2(0.,e))-z;vN=normalize(vec3(-dx/e,-dy/e,1.));vH=z;p.z=z;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;

export const FS = /* glsl */ `
precision highp float;varying vec3 vN;varying vec2 vU;varying float vH;
void main(){vec3 n=normalize(vN+vec3(.05*cos(vU.x*420.)*sin(vU.y*260.),.05*sin(vU.x*420.)*cos(vU.y*260.),0.));vec3 L=normalize(vec3(-.6,.7,.55));float d=max(dot(n,L),0.);vec3 b=mix(vec3(.74,.67,.56),vec3(.45,.35,.28),smoothstep(-.3,.45,vH));b*=.96+.04*sin(vU.x*420.)*sin(vU.y*260.);vec3 c=b*(.38+d*.9);vec3 H=normalize(L+vec3(0.,0.,1.));c+=pow(max(dot(n,H),0.),40.)*.12;c*=mix(.55,1.,smoothstep(1.25,.3,length(vU-.5)*1.4));gl_FragColor=vec4(c,1.);}`;
