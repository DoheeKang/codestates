/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
    FaSlash,
    FaCircle,
    FaSquareFull,
    FaDrawPolygon,
    FaArrowLeft
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import '../less/Drawing.less';

class Button extends Component {
    static propTypes = {
<<<<<<< HEAD
        icons: PropTypes.string.isRequired
=======
        icons: PropTypes.string.isRequired,
        map: PropTypes.object.isRequired,
        Shape: PropTypes.func.isRequired,
        drewStatus: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            map: props.map, // Set this up as props
            toggle: true,
            leftClick: undefined,
            rightClick: undefined
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { toggle } = this.state;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (event.button === 2 && toggle !== true) {
                this.setState({ toggle: !toggle });
            }
        }
    }

    drawingComponent = () => {
        // let startPos;
        const naver = window.naver;
        const { map, drewStatus } = this.props;
        const { Shape } = this.props;
        const { toggle } = this.state;
        let moveEvent;
        let startPos;
        let path;
        const lineData = [];
        let shapePoint = {};
        let isClick = false;
        if (toggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                const { coord, offset } = e;
                startPos = { coord, offset };
                // 직선을 그릴 경우
                if (Shape.name === 'Line') {
                    isClick = true;
                    // 화면상의 절대 좌표
                    shapePoint.x = e.originalEvent.clientX;
                    shapePoint.y = e.originalEvent.clientY;
                    lineData.push(shapePoint);
                    lineData.push(shapePoint);
                    shapePoint = {};
                    // 처음 그리는 경우
                    if (lineData.length === 2) {
                        path = new Shape({
                            position: startPos,
                            lineData: lineData,
                            naverMap: map
                        });
                    } else {
                        path.draw(lineData);
                    }
                    path.setMap(map);
                }
                // naver.maps.Event.removeListener(leftClick);
            });
            moveEvent = naver.maps.Event.addListener(map, 'mousemove', e => {
                if (isClick) {
                    const tempPoint = {};
                    tempPoint.x = e.originalEvent.clientX;
                    tempPoint.y = e.originalEvent.clientY;
                    lineData[lineData.length - 1] = tempPoint;
                    path.draw(lineData);
                }
            });
            const rightClick = naver.maps.Event.addListener(
                map,
                'rightclick',
                e => {
                    drewStatus();
                    if (Shape.name === 'Line') {
                        naver.maps.Event.removeListener(moveEvent);
                    } else {
                        const { coord, offset } = e;
                        const endPos = { coord, offset };
                        new Shape({
                            position: { startPos, endPos },
                            naverMap: map,
                            zoom: ''
                        }).setMap(map);
                    }
                    naver.maps.Event.removeListener(leftClick);
                    naver.maps.Event.removeListener(rightClick);
                }
            );

            this.setState({ rightClick: rightClick });
            this.setState({ leftClick: leftClick });
        }
        this.setState({ toggle: !toggle }); // Complete shape and turn off toggle
    };

    toggleState() {
        const { toggle } = this.state;
        this.setState({ toggle: !toggle });
    }

    removeListener() {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    }

    createShape = () => {
        const { map } = this.state;
        this.drawingComponent(map);
        this.toggleState();
        this.removeListener();
>>>>>>> 73333d7a05d7d1fc5a3bda756884a2da0ae44780
    };

    render() {
        const { selectButton, isSelected, isInShapeCreateMode } = this.props;
        const { icons } = this.props;
        console.log(icons, ' isInShapeCreateMode: ', isInShapeCreateMode, ', isSelected: ' + isSelected);

        return (
            <div>
                <span
                    role="button"
                    tabIndex="0"
                    className={
                        isSelected ? 'selected drawingTools' : 'drawingTools'
                    }
                    onKeyPress={() => { }}
                    onClick={() => {
                        selectButton(icons);
                    }}
                >
                    {icons === 'line' ? (
                        <FaSlash
                            className={
                                isSelected
                                    ? 'rotateIcon1 selectedIcon'
                                    : 'rotateIcon1'
                            }
                        />
                    ) : icons === 'arrow' ? (
                        <FaArrowLeft
                            className={
                                isSelected
                                    ? 'rotateIcon2 selectedIcon'
                                    : 'rotateIcon2'
                            }
                        />
                    ) : icons === 'square' ? (
                        <FaSquareFull
                            className={isSelected ? 'selectedIcon' : ''}
                        />
                    ) : icons === 'circle' ? (
                        <FaCircle
                            className={isSelected ? 'selectedIcon' : ''}
                        />
                    ) : (
                        <FaDrawPolygon
                            className={isSelected ? 'selectedIcon' : ''}
                        />
                    )}
                </span>
            </div>
        );
    }
}

export default Button;
