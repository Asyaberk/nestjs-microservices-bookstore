import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RolesService } from "app/roles/src/services/roles.service";

@Controller()
export class RolesConsumer {
  constructor(private readonly rolesService: RolesService) {}

  @EventPattern('role_created')
  async handleRoleCreated(@Payload() data: { name: string }) {
    console.log('role_created event received:', data);
    if (data?.name) {
      await this.rolesService.create({ name: data.name });
    }
  }
}