PIXI.loader
    .add("button", "../Images/Spine/pager.json", { crossOrigin: true })
    .load(onAssetsLoaded);

function onAssetsLoaded(loader, res) {

    const balloon = new Animation(100, 100, 'balloon', { x: -50, y: -50, scale: 0.18 }, '.link_balloon');
    balloon.init(res);
    
    const cappadocia = new Animation(100, 100, 'cappadocia', { x: -50, y: -50, scale: 0.18 }, '.link_cappadocia');

    cappadocia.init(res);

    const plinko = new Animation(100, 100, 'plinko', { x: -50, y: -50, scale: 0.18 }, '.link_plinkoX');
    plinko.init(res);

    const crocketx = new Animation(100, 100, 'crocketx', { x: -50, y: -50, scale: 0.185 }, '.link_cricketX');
    crocketx.init(res);
    

    const football = new Animation(200, 200, 'football x', { x: 0, y: 0, scale: 0.185 }, '.link_footballX');
    football.init(res);

    const jetx = new Animation(167, 200, 'jetx', { x: -13, y: 0, scale: 0.175 }, '.jetx_jet');
    jetx.init(res);

    // const smartsoft = new Animation(55, 20, 'smartsoft', { x: -73, y: -90, scale: 0.185 }, '.smartsoft');
    // smartsoft.init(res);
    
    // const facebook = new Animation(20, 20, 'fb', { x: -90, y: -90, scale: 0.185 }, '.facebook');
    // facebook.init(res);

    // const linkedin = new Animation(20, 20, 'in', { x: -90, y: -90, scale: 0.185 }, '.linkedin');
    // linkedin.init(res);

    // const instagram = new Animation(20, 20, 'ig', { x: -90, y: -90, scale: 0.185 }, '.instagram');
    // instagram.init(res);
}

const defaultParams = {
    x: 0,
    y: 0,
    scale: 1
}

class Animation {
    constructor(width, height, animationName, params = defaultParams, tagName) {
        this.app = null;
        this.width = width;
        this.height = height;
        this.animationName = animationName;
        this.spine = null;
        this.params = params;
        this.tagName = tagName;
    }

    init(res) {
        this.app  = new PIXI.Application({ 
            width: this.width,
            height: this.height,
            transparent: true,
            autoResize: true
        });
        document.querySelector(this.tagName).appendChild(this.app.view);
        this.onAssetsLoaded(res)
    }

    onAssetsLoaded(res) {
        this.spine = this.app.stage.addChild(new PIXI.spine.Spine(res['button'].spineData));
        this.spine.state.setAnimation(0, this.animationName, true);
        this.spine.x = this.params.x;
        this.spine.y = this.params.y;
        this.spine.scale.x = this.params.scale;
        this.spine.scale.y = this.params.scale;
    }
}

