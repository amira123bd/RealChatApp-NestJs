import {
    BadRequestException,
    Logger,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import {
    OnGatewayInit,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Namespace } from 'socket.io';
import { GatewayAdminGuard } from './admin-auth.guard';
import { SocketWithAuth } from './ids';
 
 
  import { PollsService } from './polls.service';
 
  
  @UsePipes(new ValidationPipe())
  
  @WebSocketGateway({
    namespace: 'polls',
  })
  export class PollsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    private readonly logger = new Logger(PollsGateway.name);
    constructor(private readonly pollsService: PollsService) {}
  
    @WebSocketServer() io: Namespace;
  
    // Gateway initialized (provided in module and instantiated)
    afterInit(): void {
      this.logger.log(`Websocket Gateway initialized.`);
    }
  
    async handleConnection(client: SocketWithAuth) {
      const sockets = this.io.sockets;
  
      this.logger.debug(
        `Socket connected with userID: ${client.userID}, pollID: ${client.pollID}, and name: "${client.name}"`,
      );
  
      this.logger.log(`WS Client with id: ${client.id} connected!`);
      this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  
      const roomName = client.pollID;
      await client.join(roomName);
  
      const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;
  
      this.logger.debug(
        `userID: ${client.userID} joined room with name: ${roomName}`,
      );
      this.logger.debug(
        `Total clients connected to room '${roomName}': ${connectedClients}`,
      );
  


      /// add participants
      const updatedPoll = await this.pollsService.addParticipant(client.pollID, client.userID);
  
      this.io.to(roomName).emit('poll_updated', updatedPoll);
    }
  
    async handleDisconnect(client: SocketWithAuth) {
      const sockets = this.io.sockets;
  
      const { pollID, userID } = client;
      //supprimer le participant s'il est deconnecté
      const updatedPoll = await this.pollsService.removeParticipant(
        pollID,
        userID,
      );
  
      const roomName = client.pollID;
      const clientCount = this.io.adapter.rooms?.get(roomName)?.size ?? 0;
  
      this.logger.log(`Disconnected socket id: ${client.id}`);
      this.logger.debug(`Number of connected sockets: ${sockets.size}`);
      this.logger.debug(
        `Total clients connected to room '${roomName}': ${clientCount}`,
      );
  
      // si le poll est lancé donc updatepoll=undefined
      // in this case, the socket is disconnect, but no the poll state
      if (updatedPoll) {
        this.io.to(pollID).emit('poll_updated', updatedPoll);
      }
    }
  

    // supprimer des participants
    @UseGuards(GatewayAdminGuard)
    @SubscribeMessage('remove_participant')
    async removeParticipant(
      @MessageBody('id') id: string,
      @ConnectedSocket() client: SocketWithAuth,
    ) {
      this.logger.debug(
        `Attempting to remove participant ${id} from poll ${client.pollID}`,
      );
  // remove participant
      const updatedPoll = await this.pollsService.removeParticipant(
        client.pollID,
        id,
      );
  
      if (updatedPoll) {
        this.io.to(client.pollID).emit('poll_updated', updatedPoll);
      }
    }
  }