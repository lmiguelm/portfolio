import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { Container, Header } from './styles';

const slideImages = [
  'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-ghost-white-solid-color-background.jpg',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX+AAAYIGMAAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=',
];

export default function Project() {
  return (
    <Container>
      <Header>
        <div className="slide-container">
          <Slide>
            <div className="each-slide">
              <img src={slideImages[0]} />
            </div>
            <div className="each-slide">
              <img src={slideImages[1]} />
            </div>
            <div className="each-slide">
              <img src={slideImages[2]} />
            </div>
          </Slide>
        </div>
      </Header>
    </Container>
  );
}
